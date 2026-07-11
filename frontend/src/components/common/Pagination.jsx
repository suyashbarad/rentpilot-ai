import "./Pagination.css";

export default function Pagination({

page,
totalPages,
onPageChange

}) {

  if (totalPages <= 1) return null;

  return (

    <div className="pagination">

      <button

        disabled={page === 1}

        onClick={() => onPageChange(page - 1)}

      >
        Previous
      </button>

      {

        [...Array(totalPages)].map((_, index) => (

          <button

            key={index}

            className={page === index + 1 ? "active" : ""}

            onClick={() => onPageChange(index + 1)}

          >

            {index + 1}

          </button>

        ))

      }

      <button

        disabled={page === totalPages}

        onClick={() => onPageChange(page + 1)}

      >
        Next
      </button>

    </div>

  );

}