import "./SearchResults.css";

export default function SearchResults({ results }) {

  if (!results) return null;

  const hasResults = 
    (results.buildings?.length > 0) || 
    (results.flats?.length > 0) || 
    (results.tenants?.length > 0) || 
    (results.visitors?.length > 0);

  if (!hasResults) {
    return <div className="no-results">No results found. Try a different search term.</div>;
  }

  return (

    <div className="results">

      {results.buildings?.length > 0 && (
        <div className="card">
          <h3>Buildings</h3>
          {results.buildings.map((b) => (
            <p key={b.id}>{b.name}</p>
          ))}
        </div>
      )}

      {results.flats?.length > 0 && (
        <div className="card">
          <h3>Flats</h3>
          {results.flats.map((f) => (
            <p key={f.id}>{f.flat_number}</p>
          ))}
        </div>
      )}

      {results.tenants?.length > 0 && (
        <div className="card">
          <h3>Tenants</h3>
          {results.tenants.map((t) => (
            <p key={t.id}>{t.name} (Flat {t.flat_number})</p>
          ))}
        </div>
      )}

      {results.visitors?.length > 0 && (
        <div className="card">
          <h3>Visitors</h3>
          {results.visitors.map((v) => (
            <p key={v.id}>{v.visitor_name}</p>
          ))}
        </div>
      )}

    </div>

  );

}