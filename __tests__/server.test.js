const request = require('supertest');
const server = require('../server/server.js');

afterAll(() => {
  server.close()
})

describe('\n Server Route Tests \n', () => {

  describe('Credentials Page Route', () => {

    it('should respond with status 200 OK', async () => {
      const response = await request(server).get('/');
      expect(response.status).toBe(200);
    });
    
    it('should respond with content-type text/html', async () => {
      const response = await request(server).get('/');
      expect(response.headers['content-type']).toContain('text/html');
    });
  });
});