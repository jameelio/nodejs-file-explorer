const request = require('supertest');
const { assert, expect } = require('chai');

const app = require('../app/app');


describe('Health Check',() => {
    describe('Server health endpoint check',()=>{
        it('should return 200 status',(done)=>{
            request(app)
            .get('/')
            .then(response => {
                expect(response.status).equal(200);
                done();
            });
        });
    });
});


describe('File APi Usage',() => {
    describe('load base location details',() => {
        it('should return a list of files and directories',(done)=>{
            request(app)
            .get('/location?searchPath=/etc')
            .then(response => {
                const expectedKeys = [
                    'isFile',
                    'isDir',
                    'isSymbolicLink',
                    'size',
                    'modified',
                    'created',
                    'type',
                    'path'
                ];
                expect(response.status).equal(200);
                response.body.map(res => assert.hasAllKeys(res,expectedKeys));
               
                done();
            });
        })
    });
});
