const db = require("../config/db");

exports.globalSearch = (req, res) => {

    const keyword = `%${req.query.q}%`;

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

            db.query(
                queries.buildings,
                [keyword],
                (err,result)=>{

                    if(err) reject(err);
                    else resolve(result);

                }
            );

        }),

        new Promise((resolve,reject)=>{

            db.query(
                queries.flats,
                [keyword],
                (err,result)=>{

                    if(err) reject(err);
                    else resolve(result);

                }
            );

        }),

        new Promise((resolve,reject)=>{

            db.query(
                queries.tenants,
                [keyword],
                (err,result)=>{

                    if(err) reject(err);
                    else resolve(result);

                }
            );

        }),

        new Promise((resolve,reject)=>{

            db.query(
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

        res.status(500).json(err);

    });

};