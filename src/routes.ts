import {Express, Request, Response} from "express";
import {createUseHandler} from './controller/user.controller';
import {createUserSchema} from './schema/user.schema'
import validateRequest from './middleware/validateRequest'

export default function (app: Express){

    app.get('/healthcheck', (req : Request, res : Response) => {
        res.sendStatus(200);
    })

    //register a user
    app.post('/api/users', validateRequest(createUserSchema), createUseHandler)
    // login a user

    // get user's session

    //logout

}