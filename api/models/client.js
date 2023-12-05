const config = require('config');
const mysql = require("mysql");
const assert = require('assert');
const AssertionError = assert.AssertionError;

const connectionPool = mysql.createPool({
    host: config.get('database.host'),
    user: config.get('database.user'),
    password: config.get('database.password'),
    database: config.get('database.dbname'),
    connectionLimit: 2
});

class Client{

    /**
     * This methods inserts a client data to the DB
     * @param req request object
     * @param res response object
     * @return Returns error if error inserting client data, else return success message
     */
    addClient(req, res){
        try {
            assert(req.body.name, 'Name is required');
            assert(req.body.mobile, 'Mobile is required');
            assert(req.body.email, 'Email is required');
            assert(req.body.company_name, 'Company Name is required');
            assert(req.body.type_id, 'User Type is required');
            assert(req.body.tin_number, 'TIN Number is required');

            let name = req.body.name;
            let mobile = req.body.mobile;
            let company_name = req.body.company_name;
            let email = req.body.email;
            let type_id = req.body.type_id;
            let tin_number = req.body.tin_number;

            connectionPool.query(`INSERT IGNORE into invoicer.client(name, mobile, company_name, 
                email,type_id,user_id,tin_no) VALUES(?,?,?,?,?,?,?)`, [
                name, mobile, company_name, email,type_id, req.user_id,tin_number], function(error, result, fields) {
                if (error) {
                    res.status(500).send({
                        status: "error",
                        code: error.code,
                        message: error.sqlMessage
                    });
                } else if(result.insertId > 0){
                    res.status(200).send({
                        status: "success",
                        data: "",
                        message: "Client added successfully"
                    });
                }
                else{
                    res.status(422).send({
                        status: "error",
                        message: "Client with same email already exists"
                    });
                }
            });
        }
        catch (e) {
            if(e instanceof AssertionError){
                console.log(req.url,"-",__function,"-","AssertionError : ",e.message);
                res.status(500).send({
                    status: "AssertionError",
                    message: e.message
                });
            }
            else{
                console.log(req.url,"-",__function,"-","Error : ",e.message);
                res.status(500).send({
                    status: "error",
                    message: e.message
                });
            }
        }
    }

    /**
     * This function returns all the clients requested by a user
     * @param req request object
     * @param res response object
     * @return Returns the list of clients if they exists else returns blank result with 204 statuscode.
     *         Returns error type & message in case of error
     */
    getClients(req, res){
        try {
            
            connectionPool.query(`
            SELECT cst.id  Client_id, 
                   cst.name, 
                   cst.mobile, 
                   cst.company_name, 
                   cst.email,
                   cst.tin_no tin_number, 
                   ut.name company_type 
            FROM   invoicer.client cst 
                   INNER JOIN user_type ut 
                           ON cst.type_id = ut.id 
            WHERE  user_id = ? `, req.user_id,
                function(error, result, fields) {
                    if (error) {
                        res.status(500).send({
                            status: "error",
                            code: error.code,
                            message: error.sqlMessage
                        });
                    } else{
                        if(result.length>0){

                            res.status(200).send({
                                status: "success",
                                data: result,
                                length: result.length
                            });
                        }
                        else{
                            res.status(204).send();
                        }
                    }
                });
        }
        catch (e) {
            if(e instanceof AssertionError){
                console.log(req.url,"-",__function,"-","AssertionError : ",e.message);
                res.status(500).send({
                    status: "AssertionError",
                    message: e.message
                });
            }
            else{
                console.log(req.url,"-",__function,"-","Error : ",e.message);
                res.status(500).send({
                    status: "error",
                    message: e.message
                });
            }
        }
    }

    /**
     * This function returns a single client data as per the client id
     * @param req request object
     * @param res response object
     * @return Returns a client data if it exists. Returns error in case of error
     */
    getClient(req, res){
        try {
            assert(req.params.Client_id, 'Client Id not provided');

            connectionPool.query(`SELECT * FROM invoicer.client where id = ? and user_id = ?`,
                [req.params.Client_id, req.user_id], function(error, result, fields) {
                    if (error) {
                        res.status(500).send({
                            status: "error",
                            code: error.code,
                            message: error.sqlMessage
                        });
                    } else{
                        if(result.length>0){
                            res.status(200).send({
                                status: "success",
                                data: result[0],
                                length: result.length
                            });
                        }
                        else{
                            res.status(204).send();
                        }
                    }
                });
        }
        catch (e) {
            if(e instanceof AssertionError){
                console.log(req.url,"-",__function,"-","AssertionError : ",e.message);
                res.status(500).send({
                    status: "AssertionError",
                    message: e.message
                });
            }
            else{
                console.log(req.url,"-",__function,"-","Error : ",e.message);
                res.status(500).send({
                    status: "error",
                    message: e.message
                });
            }
        }
    }

    /**
     * This function deletes a single client along with its data as per the client id
     * @param req request object
     * @param res response object
     * @return Returns true if data deleted successfully. Returns error in case of error
     */
    deleteClient(req, res){
        try {
            assert(req.params.Client_id, 'Client Id not provided');

            connectionPool.query(`DELETE FROM invoicer.client where id = ? and user_id = ?`,
                [req.params.Client_id, req.user_id], function(error, result, fields) {
                    if (error) {
                        res.status(500).send({
                            status: "error",
                            code: error.code,
                            message: error.sqlMessage
                        });
                    } else{
                        if(result.affectedRows>0){
                            res.status(200).send({
                                status: "success",
                                data: ""
                            });
                        }
                        else{
                            res.status(204).send();
                        }
                    }
                });
        }
        catch (e) {
            console.log(req.url,"-",__function,"-","Error : ",e.message);
            res.status(500).send({
                status: "error",
                message: e.message
            });
        }
    }
}

module.exports = Client;
