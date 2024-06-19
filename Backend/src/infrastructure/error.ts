import {NextFunction, Response} from "express";

export default function sendError(res:Response, next:NextFunction, error: unknown ): void {
    if( typeof error === 'object' && error !== null && 'message' in error){
        res.status(500).send((error as Error).message)
    }else {
        res.status(500).send("An unknown error occurred");
    }
    next(error)
}