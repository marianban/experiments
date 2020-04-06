import {} from 'rxjs';
import { catchError } from 'rxjs/operators';

// catchError serves for error handling
// if we don't have it then in case of exception the whole subscription will be blown up
// check switchMap.js for an example
