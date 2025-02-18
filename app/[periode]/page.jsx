export default async function Page({ params }) {
    // Await the params to ensure they are available
    const { periode } = await params;
    // Split the periode into season and year
    const [season, year] = periode.split('-');
    return <div className="capitalize">{season + " "+ year}</div>;
  }