const { assert, expect } = require('chai');

const fileUtils = require('../app/file-acces-utilities');

describe('File Api Access Utilities',()=>{
    describe('Location statistics',()=>{

        it('it should throw an error when directory does not exist',async ()=>{
            const fileLocation = '/vax';
            const expected = `ENOENT: no such file or directory, stat '${fileLocation}'`;

            try {
                await fileUtils.getLocationStats(fileLocation);
            } catch (error) {
                expect(error.message).to.equal(expected);
                return;
            }
        });

        it('should contain { isDir:true } when given location is a directory',async () => {
            const fileLocation = '/var';

            const expected = {
                isFile: false,
                isDir: true,
                isSymbolicLink: false,
                size: 4096,
                modified: '2021-11-22T21:28:21.426Z',
                created: '2021-11-22T21:28:21.426Z',
                type: ''
            }

            const results =  await fileUtils.getLocationStats(fileLocation);
            expect(results.isDir).to.equal(expected.isDir);
        });

        it('should contain { isFile:true } when give location is a file',async()=>{
            const fileLocation = '/var/test.txt';

            const expected = true;

            const results = await fileUtils.getLocationStats(fileLocation);
            assert.deepEqual(expected, results.isFile);  
        });
    });

    describe('Contents Of Directory',()=>{
        it('should reject when directory does not exist',async ()=>{
            const directoryLookup = '/var/ping';
            const expected = `ENOENT: no such file or directory, scandir '${directoryLookup}'`;

            try {
                await fileUtils.checkContentsInDir(directoryLookup);
            } catch (error) {
                expect(error.message).to.equal(expected);
                return;
            }
        });

        it('should error when given location is a file',async ()=>{
            const directoryLookup = '/var/test.txt';
            const expected = `ENOTDIR: not a directory, scandir '${directoryLookup}'`;

            try {
                await fileUtils.checkContentsInDir(directoryLookup);
            } catch (error) {
                expect(error.message).to.equal(expected);
                return;
            }
        });

        it('should return a list of files/directories in a give location',async ()=>{
            const filelocation = '/var';

            const expected = [
                'backups', 
                'cache',
                'crash',   
                'lib',
                'local',   
                'lock',
                'log',     
                'mail',
                'metrics', 
                'opt',
                'run',     
                'snap',
                'spool',   
                'test.txt',
                'tmp'
            ]

            const results = await fileUtils.checkContentsInDir(filelocation);

            assert.notStrictEqual(results, expected, 'check files in directory');

        });
    });

    describe('Path/directory aggregated results',()=>{
        it('should return a list of details for file and directories in path containing all keys',async()=>{
            const fileLocation = '/var';

            const results = await fileUtils.getLocationDetails(fileLocation);
            
            const expectedKeys = [
                'isFile',
                'isDir',
                'isSymbolicLink',
                'size',
                'modified',
                'created',
                'type',
                'path'
            ]
            expect(results.length).to.be.greaterThan(1);
            results.map(paths => assert.hasAllKeys(paths,expectedKeys));
        });
    });
});