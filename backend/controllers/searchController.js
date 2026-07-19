const { pool } = require("../config/db");

exports.globalSearch = (req, res) => {

    if (!req.query.q || req.query.q.trim() === "") {
        return res.json({
            buildings: [],
            flats: [],
            tenants: [],
            visitors: []
        });
    }

    const keyword = `%${req.query.q.trim()}%`;

    const queries = {

        buildings: `
        SELECT
        id,
        building_name AS name,
        address
        FROM buildings
        WHERE building_name LIKE ?
        `,

        flats: `
        SELECT
        id,
        flat_number,
        status
        FROM flats
        WHERE flat_number LIKE ?
        `,

        tenants: `
        SELECT
        tenants.id,
        users.name,
        flats.flat_number
        FROM tenants
        JOIN users ON tenants.user_id=users.id
        JOIN flats ON tenants.flat_id=flats.id
        WHERE users.name LIKE ?
        `,

        visitors: `
        SELECT
        id,
        visitor_name
        FROM visitors
        WHERE visitor_name LIKE ?
        `
    };

    Promise.all([

        new Promise((resolve,reject)=>{

            pool.query(
                queries.buildings,
                [keyword],
                (err,result)=>{

                    if(err) reject(err);
                    else resolve(result);

                }
            );

        }),

        new Promise((resolve,reject)=>{

            pool.query(
                queries.flats,
                [keyword],
                (err,result)=>{

                    if(err) reject(err);
                    else resolve(result);

                }
            );

        }),

        new Promise((resolve,reject)=>{

            pool.query(
                queries.tenants,
                [keyword],
                (err,result)=>{

                    if(err) reject(err);
                    else resolve(result);

                }
            );

        }),

        new Promise((resolve,reject)=>{

            pool.query(
                queries.visitors,
                [keyword],
                (err,result)=>{

                    if(err) reject(err);
                    else resolve(result);

                }
            );

        })

    ])

    .then(results=>{
        res.json({
            buildings:results[0],
            flats:results[1],
            tenants:results[2],
            visitors:results[3]
        });
    })
    .catch(err=>{
        console.error("SEARCH ERROR:", err);
        res.status(500).json({ success: false, error: err.message || "Search failed" });
    });

};