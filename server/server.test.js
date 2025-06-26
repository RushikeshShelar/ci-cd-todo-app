const request = require('supertest');
const app = require('./server'); // or wherever your Express app is exported

describe('Todo API', () => {
    it('GET /todos should return an array', async () => {
        const res = await request(app).get('/todos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /todos should add a new todo', async () => {
        const res = await request(app)
            .post('/todos')
            .set('Content-Type', 'application/json') // 👈 Add this
            .send({ task: 'Test todo' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('task', 'Test todo');
    });

    it('POST /todos without task should fail', async () => {
        const res = await request(app)
            .post('/todos')
            .set('Content-Type', 'application/json') // 👈 Add this
            .send({});

        expect(res.statusCode).toBe(400);
    });
});
