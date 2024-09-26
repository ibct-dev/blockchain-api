import fetch from "node-fetch";
import { DidDocument } from "./didDocument.service";
import { IDidResolver } from "@decentralized-identity/did-common-typescript";
import { config } from "@config";
export class LitResolver implements IDidResolver {
    private endPoint: string;

    constructor(endPoint?: string) {
        if (endPoint) {
            this.endPoint = endPoint;
        } else {
            this.endPoint = config.resover_endpoint;
            // this.endPoint = "http://10.5.15.19/1.0/identifiers/";
        }
    }

    /**
     * Resolves the given DID.
     * @param did the DID id that will be resolved
     */
    public async resolve(did: string): Promise<any> {
        if (!did) {
            throw new Error(`Resolver has no entry for requested DID: ${did}`);
        }
        if (!this.endPoint) {
            throw new Error(`Resolver has no endpoint`);
        }
        try {
            const url = this.endPoint + did;

            const response = await fetch(url);
            const obj = await response.json();

            return {
                didDocument: new DidDocument({
                    "@context": obj["@context"],
                    id: obj.id,
                    service: obj.service,
                    controller: obj.controller,
                    authentication: obj.authentication,
                    assertionMethod: obj.assertionMethod,
                    keyAgreement: obj.keyAgreement,
                    capabilityInvocation: obj.capabilityInvocation,
                    capabilityDelegation: obj.capabilityDelegation,

                    verificationMethod: obj.verificationMethod,
                }).rawDocument,
            };
        } catch (err) {
            throw new Error(`Resolver fetch error `);
        }
    }
}
