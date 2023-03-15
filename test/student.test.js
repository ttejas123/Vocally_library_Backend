// Import required libraries
const axios = require('axios');

// Define the API endpoint
const endpoint = 'http://localhost:3000/student';
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdHVkZW50SWQiOiJjbGY4ZDZpZWQwMDA0dTFjNG85Ynl6MWo0IiwiaWF0IjoxNjc4ODA1MDQ5fQ.lD-mpVNxjz1uHSKOZnz1FNa-WyZD35hpAoWmJDFThL0';

describe('Student API', () => {
  // Test the GET endpoint
  describe('GET /students', () => {
    it('should return a list of Student', async () => {
      // GET request With Token to the API endpoint
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: token
        }
      });
      // Check the response status code is 200 (OK)
      expect(response.status).toBe(200);     
    });

    it('should return a single Student', async () => {
      let id = "clf95nehs0000u1r06xeakdvn"
      // GET request With Token to the API endpoint
      const response = await axios.get(endpoint+`/${id}`, {
        headers: {
          Authorization: token
        }
      });
      // Check the response status code is 200 (OK)
      expect(response.status).toBe(200);   
      
      // check the response with data 
      expect(response.data).toHaveProperty('id');
      expect(response.data.id).toBe(id);
    });
  });

  // Test the POST endpoint
  describe('POST /Student', () => {
    it('should create a new Student', async () => {
      // Define the request data
      const requestData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: "john@123" 
      };

      // Make a POST request to the API endpoint with the request data
      const response = await axios.post(endpoint, requestData, {
        headers: {
          Authorization: token
        }  
      });

      // Check the response status code is 201 (Created)
      expect(response.status).toBe(201);

      // Check that the response data is an object
      expect(typeof response.data).toBe('object');

      // Check that the response data contains the created Student object with specific properties
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('token');
      expect(response.password).not.toBe(requestData.password);
      expect(response.data.name).toBe(requestData.name);
      expect(response.data.email).toBe(requestData.email);
    });

  });

    // Test the PATCH endpoint
    describe('PATCH /Student', () => {
      it('should update Student John', async () => {
        const resAllStudent = await axios.get(endpoint, {
          headers: {
            Authorization: token
          }
        });
  
        expect(resAllStudent.status).toBe(200);
  
        let johnData = {}
        const requestData = {
          name: 'John Doe Thakare',
          email: 'johndoe@example.com',
        };
  
        resAllStudent.data.map((val, index) => {
            if(val.email == 'johndoe@example.com') {
              johnData = val;
            }
        })
        
        // const response = await axios.patch(endpoint, requestData, {
        //   headers: {
        //     Authorization: token
        //   }
        // });

        // ex
      })
    })

   // Test the DELETE endpoint
   describe('Delete /Student', () => {
    it('should Delete Student John', async () => {
      const resAllStudent = await axios.get(endpoint, {
        headers: {
          Authorization: token
        }
      });

      expect(resAllStudent.status).toBe(200);

      let johnData = {}

      resAllStudent.data.map((val, index) => {
          if(val.email == 'johndoe@example.com') {
            johnData = val;
          }
      })

      const response = await axios.delete(endpoint+`/${johnData.id}`, {
        headers: {
          Authorization: token
        }  
      });

      expect(response.status).toBe(204);
    })
   })
});