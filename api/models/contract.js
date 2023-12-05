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

class Contract{

    /**
     * This methods inserts a contract data to the DB
     * @param req request object
     * @param res response object
     * @return Returns error if error inserting contract data, else return success message
     */
    addContract(req, res){
        try {
            assert(req.body.name,"Name is required");
            assert(req.body.description,"Description is required");
            assert(req.body.rate,"Rate is required");
            assert(req.body.sku,"SKU/Unique Code is required");
            assert(req.user_id, 'User not logged in');

            let name = req.body.name;
            let description = req.body.description;
            let rate  = req.body.rate ;
            let sku = req.body.sku;
            let label = req.body.hasOwnProperty('label') ? req.body.label : "";

            connectionPool.query(`INSERT into invoicer.contract(name,label,description,rate ,sku,user_id) 
            VALUES(?,?,?,?,?,?)`, [name,label,description,rate,sku,req.user_id], function(error, result, fields) {
                if (error) {
                    if(error.code==='ER_DUP_ENTRY'){
                        res.status(422).send({
                            status: "error",
                            message: "Contract with this SKU already exists"
                        });
                    }
                    else{
                        res.status(500).send({
                            status: "error",
                            code: error.code,
                            message: error.sqlMessage
                        });
                    }
                } else if(result.insertId > 0){
                    res.status(200).send({
                        status: "success",
                        data: "",
                        message: "Contract added successfully"
                    });
                }
                else{
                    res.status(422).send({
                        status: "error",
                        message: "Contract with this SKU already exists"
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
     * This function returns all the contracts of a user
     * @param req request object
     * @param res response object
     * @return Returns the list of contracts if they exists else returns blank result with 204 statuscode.
     *         Returns error type & message in case of error
     */
    getContracts(req, res){
        try {
            assert(req.user_id, 'User Id not found');

            connectionPool.query(`SELECT * FROM invoicer.contract where user_id = ?`, req.user_id,
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
     * This function returns a single contract as per the contract id
     * @param req request object
     * @param res response object
     * @return Returns a contract if it exists. Returns error in case of error
     */
    getContract(req, res){
        try {
            assert(req.params.id, 'Contract Id not provided');
            assert(req.user_id, 'User not logged in');

            connectionPool.query(`SELECT * FROM invoicer.contract where id = ? and user_id = ?`,
                [req.params.id, req.user_id], function(error, result, fields) {
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
}

module.exports = Contract;
