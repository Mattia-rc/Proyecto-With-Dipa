import bcrypt from "bcryptjs";

const data = {
    users: [
        {
          name: 'Basir',
          email: 'admin@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: true,
        },
        {
          name: 'John',
          email: 'user@example.com',
          password: bcrypt.hashSync('123456'),
          isAdmin: false,
        },
      ],
    products: [
        {
            /* _id: '1', */
            name: 'Nike Slim shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirts',
            image: '/img/p1.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'high quality shirt',
        },
        {
            /* _id: '2', */
            name: 'Adidas Slim shirt',
            slug: 'Adidas-slim-shirt',
            category: 'Shirts',
            image: '/img/p2.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Adidas',
            rating: 4.5,
            numReviews: 4,
            description: 'high quality shirt',
        },
        {
            /* _id: '3', */
            name: 'Reebook Slim shirt',
            slug: 'Reebook-slim-shirt',
            category: 'Shirts',
            image: '/img/p3.jpg',
            price: 120,
            countInStock: 10,
            brand: 'Reebook',
            rating: 4.5,
            numReviews: 9,
            description: 'high quality shirt',
        },
       
    ],
};

export default data