import {
    IDidDocumentPublicKey,
    IDidDocumentServiceDescriptor,
} from "@decentralized-identity/did-common-typescript";
/**
 * Interface describing the expected shape of a Decentralized Identity Document.
 * @interface
 */
export default interface IDidDocument {
    /** The standard context for DID Documents. */
    "@context": string; //"https://w3id.org/did/v1";
    /** The DID to which this DID Document pertains. */
    id: string;
    /** Array of public keys associated with the DID. */
    verificationMethod?: IDidDocumentPublicKey[];
    /** Array of services associated with the DID. */
    service?: IDidDocumentServiceDescriptor[];
    /** The DID that is used to create the DID */
    controller?: string;
    /** The list of DIDs that can invoke capabilities on another DID subject  */
    capabilityInvocation?: (string | any)[];
    /** The list of DIDs that can be granted capabilities on another DID subject  */
    capabilityDelegation?: (string | any)[];
    /** Array of authentication methods. */
    authentication?: (string | any)[];
    /** Array of assertionMethod methods. */
    assertionMethod?: (string | any)[];
    /** Array of keyAgreement methods. */
    keyAgreement?: (string | any)[];
}
