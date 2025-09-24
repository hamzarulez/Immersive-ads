import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient() // Add await here
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch only the data we need for the analytics page
  const { data: projects, error } = await supabase
    .from('projects')
    .select('status, platform, contract_value') // Select only necessary columns
    .eq('creator_id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Perform calculations on the server
  const completedProjects = projects.filter(p => p.status === 'Completed');

  const kpiData = {
    projects: completedProjects.length,
    value: completedProjects.reduce((sum, p) => sum + p.contract_value, 0),
    rating: null, // Change this from 4.8 to null
  };

  const performanceByPlatform: { [key: string]: { name: string, projects: number, value: number } } = {};
  completedProjects.forEach(p => {
    if (!performanceByPlatform[p.platform]) {
      performanceByPlatform[p.platform] = { name: p.platform, projects: 0, value: 0 };
    }
    performanceByPlatform[p.platform].projects += 1;
    performanceByPlatform[p.platform].value += p.contract_value;
  });

  const chartData = Object.values(performanceByPlatform);

  // Return a clean JSON response
  return NextResponse.json({ kpiData, chartData })
}