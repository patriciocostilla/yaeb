/**
 *  @openapi
 *  components:
 *    schemas:
 *      Validate:
 *        type: object
 *        properties:
 *          int: 
 *            type: integer
 *            description: Some random integer
 *            example: 42
 *          string:
 *            type: string
 *            description: Some random string
 *            example: Hello World!
 */
export interface Validate {
  int: number;
  string: string;
}