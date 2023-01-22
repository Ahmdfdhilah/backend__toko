import mysql from "mysql2";

const datas = [{
    number: 1,
    id: "6fe5b1df-14b8-4481-ba26-9e0ed04e67c2",
    name: "baju",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie nunc non blandit massa enim nec dui nunc. Aliquet lectus proin nibh nisl condimentum id venenatis. Aliquet porttitor lacus luctus accumsan tortor posuere ac. Egestas dui id ornare arcu odio ut sem nulla. Purus gravida quis blandit turpis. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Tellus in metus vulputate eu scelerisque felis. Fermentum et sollicitudin ac orci phasellus egestas. Ut ornare lectus sit amet est placerat in egestas erat. Purus sit amet luctus venenatis lectus. Sed euismod nisi porta lorem mollis aliquam. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit.",
    price:"40000",
    img:"images/pic2.jpg"
},
{
    number: 2,
    id: "ca8ad0cb-56ff-45d3-b8da-cd1349e60bc0",
    name: "tshirt",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie nunc non blandit massa enim nec dui nunc. Aliquet lectus proin nibh nisl condimentum id venenatis. Aliquet porttitor lacus luctus accumsan tortor posuere ac. Egestas dui id ornare arcu odio ut sem nulla. Purus gravida quis blandit turpis. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Tellus in metus vulputate eu scelerisque felis. Fermentum et sollicitudin ac orci phasellus egestas. Ut ornare lectus sit amet est placerat in egestas erat. Purus sit amet luctus venenatis lectus. Sed euismod nisi porta lorem mollis aliquam. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit.",
    price:"60000",
    img:"images/pic3.jpg"   
},{
    number: 3,
    id: "b54fe3d3-b50d-4ec1-85ad-bb10f9707fb0",
    name: "sepatu",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie nunc non blandit massa enim nec dui nunc. Aliquet lectus proin nibh nisl condimentum id venenatis. Aliquet porttitor lacus luctus accumsan tortor posuere ac. Egestas dui id ornare arcu odio ut sem nulla. Purus gravida quis blandit turpis. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Tellus in metus vulputate eu scelerisque felis. Fermentum et sollicitudin ac orci phasellus egestas. Ut ornare lectus sit amet est placerat in egestas erat. Purus sit amet luctus venenatis lectus. Sed euismod nisi porta lorem mollis aliquam. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit.",
    price:"200000",
    img:"images/pic4.jpg"
},{
    number: 4,
    id: "b07c589e-282e-4211-b644-1c90d81c3e46",
    name: "sandal",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie nunc non blandit massa enim nec dui nunc. Aliquet lectus proin nibh nisl condimentum id venenatis. Aliquet porttitor lacus luctus accumsan tortor posuere ac. Egestas dui id ornare arcu odio ut sem nulla. Purus gravida quis blandit turpis. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Tellus in metus vulputate eu scelerisque felis. Fermentum et sollicitudin ac orci phasellus egestas. Ut ornare lectus sit amet est placerat in egestas erat. Purus sit amet luctus venenatis lectus. Sed euismod nisi porta lorem mollis aliquam. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit.",
    price:"100000",
    img:"images/pic5.jpg"
},{
    number: 5,
    id: "8cc588b3-cbab-46b6-8ca6-b7cd17e5d769",
    name: "kaos kaki",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie nunc non blandit massa enim nec dui nunc. Aliquet lectus proin nibh nisl condimentum id venenatis. Aliquet porttitor lacus luctus accumsan tortor posuere ac. Egestas dui id ornare arcu odio ut sem nulla. Purus gravida quis blandit turpis. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Tellus in metus vulputate eu scelerisque felis. Fermentum et sollicitudin ac orci phasellus egestas. Ut ornare lectus sit amet est placerat in egestas erat. Purus sit amet luctus venenatis lectus. Sed euismod nisi porta lorem mollis aliquam. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit.",
    price:"20000",
    img:"images/pic6.jpg"
},{
    number: 6,
    id: "0b39747f-ca05-4555-adcc-38de399c7a66",
    name: "topi",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie nunc non blandit massa enim nec dui nunc. Aliquet lectus proin nibh nisl condimentum id venenatis. Aliquet porttitor lacus luctus accumsan tortor posuere ac. Egestas dui id ornare arcu odio ut sem nulla. Purus gravida quis blandit turpis. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Tellus in metus vulputate eu scelerisque felis. Fermentum et sollicitudin ac orci phasellus egestas. Ut ornare lectus sit amet est placerat in egestas erat. Purus sit amet luctus venenatis lectus. Sed euismod nisi porta lorem mollis aliquam. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit.",
    price:"80000",
    img:"images/pic7.jpg"
}]

async function post () {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
      });
    try{
        datas.map((x)=>{
            const sql =    `INSERT INTO 'project-1'.'item' ('number', 'id', 'name', 'description', 'price', 'img') VALUES ('${x.number}', '${x.id}', '${x.name}', '${x.desc}', '${x.price}', '${x.img}')`;
            connection.query(sql, function(err){
                throw err
            })
            console.log(`${x.number} data was inserted`);
        })
     

    
        // const [data] = await connection.execute(query);
    }
    catch(err) {
        console.log(err);
    }
}