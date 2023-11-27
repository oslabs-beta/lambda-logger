const request = require('supertest');
const server = require('../server/server.js');

afterAll(() => {
  server.close()
})

jest.mock('aws-sdk', () => {
  return {
    CloudWatchLogs: jest.fn(() => ({
      describeLogGroups: jest.fn((params, callback) => {
        // Mock response or error based on params or other conditions
        const mockResponse = {
          logGroups: [
            { logGroupName: '/aws/lambda/test-group1' },
            { logGroupName: '/aws/lambda/test-group2' }
          ]
        };
        // if (params.accessKey !== "test-accessKey" || params.secretKey !== "test-secretKey" || params.region !== "test-region") {
        //   callback(new Error('Incorrect Credentials'), null);
        // } else {
          callback(null, mockResponse);
        // }
      }),
    })),
    config: {
      update: jest.fn(() => {
        return
      })
    }
  };
});


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

  describe('Fetch Log Groups Route', () => {

    // server responds with a status 200
    it('should respond with status 200 OK', async () => {
      const headers = {
        "accessKey": "test-accessKey",
        "secretKey": "test-secretKey",
        "aws-region": "test-region"
      }
      const response = await request(server)
      .get('/loggroups')
      .set(headers)
      expect(response.status).toBe(200);
    });

    // server responds with content type application/json
    it('should respond with content-type application/json', async () => {
      const response = await request(server).get('/loggroups');
      expect(response.headers['content-type']).toContain('application/json');
    })
  })
});