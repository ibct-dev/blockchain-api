import IDidDocument from "./didDocument.interface";
import {
    IDidDocumentPublicKey,
    IDidDocumentServiceDescriptor,
} from "@decentralized-identity/did-common-typescript";

/**
 * Class for performing various DID document operations.
 */
export class DidDocument {
    /** Url of the @context for this document */
    context: string;
    /** The DID to which this DID Document pertains. */
    id: string;
    /** Array of public keys associated with the DID */
    verificationMethod: IDidDocumentPublicKey[];
    /** The raw document returned by the resolver. */
    rawDocument: IDidDocument;

    constructor(json: IDidDocument) {
        for (const field of ["@context", "id"]) {
            if (!(field in json)) {
                throw new Error(`${field} is required`);
            }
        }
        this.context = json["@context"];
        this.id = json.id;
        this.verificationMethod = json.verificationMethod || [];
        this.rawDocument = json;
    }
    /**
     * Returns the DID within the key ID given.
     * @param keyId A fully-qualified key ID. e.g. 'did:example:abc#key1'
     * @example 'did:example:abc#key1' returns 'did:example:abc'
     */
    static getDidFromKeyId(keyId: string): string {
        const didLength: number = keyId.indexOf("#");
        const did: string = keyId.substr(0, didLength);
        return did;
    }

    /**
     * Gets the matching public key for a given key id
     *
     * @param id fully qualified key id
     */
    getPublicKey(id: string): IDidDocumentPublicKey | undefined {
        return this.verificationMethod.find(item => item.id === id);
    }
    /**
     * Returns all of the service endpoints contained in this DID Document.
     */
    getServices(): IDidDocumentServiceDescriptor[] {
        return this.rawDocument.service || [];
    }
    /**
     * Returns all of the service endpoints matching the given type.
     *
     * @param type The type of service(s) to query.
     */
    getServicesByType(type: string): IDidDocumentServiceDescriptor[] {
        return this.getServices().filter(service => service.type === type);
    }
}
