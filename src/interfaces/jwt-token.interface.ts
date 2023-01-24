/**
 *  @openapi
 *  components:
 *    schemas:
 *      JWTToken:
 *        type: object
 *        properties:
 *          unique_name:
 *            type: string
 *          userId:
 *            type: integer
 *          avatar-path:
 *            type: string
 *          acopiosNetwork:
 *            type: string
 *          accionesId:
 *            type: string
 *          productosId:
 *            type: string
 *          nbf:
 *            type: number
 *          exp:
 *            type: number
 *          iat: 
 *            type: number
 *          iss:
 *            type: number        
 */
export interface JWTToken {
  unique_name: string;
  userId: string;
  'avatar-path': string;
  acopiosNetwork: string;
  accionesId: string;
  productosId: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: number;
}
