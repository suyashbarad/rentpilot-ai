import "./SearchResults.css";

export default function SearchResults({ results }) {

  if (!results) return null;

  return (

    <div className="results">

      <div className="card">

        <h3>Buildings</h3>

        {results.buildings?.map((b)=>(

          <p key={b.id}>
            {b.name}
          </p>

        ))}

      </div>

      <div className="card">

        <h3>Flats</h3>

        {results.flats?.map((f)=>(

          <p key={f.id}>
            {f.flat_number}
          </p>

        ))}

      </div>

      <div className="card">

        <h3>Tenants</h3>

        {results.tenants?.map((t)=>(

          <p key={t.id}>
            {t.name}
          </p>

        ))}

      </div>

      <div className="card">

        <h3>Visitors</h3>

        {results.visitors?.map((v)=>(

          <p key={v.id}>
            {v.visitor_name}
          </p>

        ))}

      </div>

    </div>

  );

}