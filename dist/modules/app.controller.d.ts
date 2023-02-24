import { UserEntity } from './users/user.entity';
export declare class AppController {
    constructor();
    getProfile(user: UserEntity): UserEntity;
    getSystems(): {
        total: number;
        systems: ({
            id: number;
            uid: string;
            hostname: string;
            fqdn: string;
            name: string;
            type: string;
            status: string;
            statusCategory: string;
            runningStatus: string;
            runningStatusCategory: string;
            cpu: number;
            memory: number;
            disk: string;
            monitoringEnabled: boolean;
            managementType: string;
            organisation: {
                id: number;
                name: string;
            };
            systemimage: {
                id: number;
                name: string;
                externalId: string;
                templateId: number;
                osId: number;
                osName: string;
                osType: string;
                osVersion: string;
                osVersionId: number;
            };
            operatingsystemVersion: {
                id: number;
                osId: number;
                osName: string;
                osType: string;
                osVersion: string;
            };
            providerId: number;
            provider: string;
            providerApi: string;
            systemproviderConfiguration: {
                id: number;
                externalId: string;
                name: string;
                description: string;
            };
            region: string;
            zone: {
                id: number;
                name: string;
            };
            networks: {
                id: number;
                mac: string;
                networkId: number;
                name: string;
                uid: string;
                netIpv4: string;
                netGatewayv4: string;
                netMaskv4: number;
                netIpv6: any;
                netGatewayv6: any;
                netMaskv6: number;
                netPublic: boolean;
                netCustomer: boolean;
                netInternal: boolean;
                vlan: number;
                ips: {
                    id: number;
                    publicIpv4: any;
                    ipv4: string;
                    publicIpv6: any;
                    ipv6: any;
                    hostname: string;
                }[];
                destinationv4: string[];
                destinationv6: string[];
                netslotNumber: number;
            }[];
            publicNetworking: boolean;
            statsSummary: {
                cpu: {
                    unit: string;
                    max: number;
                    value: number;
                    statusCategory: string;
                };
                diskspace: {
                    unit: string;
                    max: number;
                    value: number;
                    statusCategory: string;
                };
                memory: {
                    unit: string;
                    max: number;
                    value: number;
                    statusCategory: string;
                };
            };
            dtExpires: number;
            billingStatus: string;
            externalInfo: any;
            parentsystem: {
                id: number;
                name: string;
            };
        } | {
            id: number;
            uid: string;
            hostname: string;
            fqdn: string;
            name: string;
            type: string;
            status: string;
            statusCategory: string;
            runningStatus: string;
            runningStatusCategory: string;
            cpu: number;
            memory: number;
            disk: string;
            monitoringEnabled: boolean;
            managementType: string;
            organisation: {
                id: number;
                name: string;
            };
            systemimage: {
                id: number;
                name: string;
                externalId: string;
                templateId: number;
                osId: number;
                osName: string;
                osType: string;
                osVersion: string;
                osVersionId: number;
            };
            operatingsystemVersion: {
                id: number;
                osId: number;
                osName: string;
                osType: string;
                osVersion: string;
            };
            providerId: number;
            provider: string;
            providerApi: string;
            systemproviderConfiguration: {
                id: number;
                externalId: string;
                name: string;
                description: string;
            };
            region: string;
            zone: {
                id: number;
                name: string;
            };
            networks: ({
                id: number;
                mac: string;
                networkId: number;
                name: string;
                uid: string;
                netIpv4: string;
                netGatewayv4: string;
                netMaskv4: number;
                netIpv6: string;
                netGatewayv6: string;
                netMaskv6: number;
                netPublic: boolean;
                netCustomer: boolean;
                netInternal: boolean;
                vlan: number;
                ips: ({
                    id: number;
                    publicIpv4: string;
                    ipv4: any;
                    publicIpv6: any;
                    ipv6: any;
                    hostname: string;
                } | {
                    id: number;
                    publicIpv4: any;
                    ipv4: any;
                    publicIpv6: string;
                    ipv6: any;
                    hostname: string;
                })[];
                destinationv4: string[];
                destinationv6: string[];
                netslotNumber: number;
            } | {
                id: number;
                mac: string;
                networkId: number;
                name: string;
                uid: string;
                netIpv4: string;
                netGatewayv4: string;
                netMaskv4: number;
                netIpv6: any;
                netGatewayv6: any;
                netMaskv6: number;
                netPublic: boolean;
                netCustomer: boolean;
                netInternal: boolean;
                vlan: number;
                ips: {
                    id: number;
                    publicIpv4: any;
                    ipv4: string;
                    publicIpv6: any;
                    ipv6: any;
                    hostname: string;
                }[];
                destinationv4: string[];
                destinationv6: any[];
                netslotNumber: number;
            })[];
            publicNetworking: boolean;
            statsSummary: {
                cpu: {
                    unit: string;
                    max: number;
                    value: number;
                    statusCategory: string;
                };
                diskspace: {
                    unit: string;
                    max: number;
                    value: number;
                    statusCategory: string;
                };
                memory: {
                    unit: string;
                    max: number;
                    value: number;
                    statusCategory: string;
                };
            };
            dtExpires: number;
            billingStatus: string;
            externalInfo: any;
            parentsystem: {
                id: number;
                name: string;
            };
        } | {
            id: number;
            uid: string;
            hostname: string;
            fqdn: string;
            name: string;
            type: string;
            status: string;
            statusCategory: string;
            runningStatus: string;
            runningStatusCategory: string;
            cpu: number;
            memory: number;
            disk: string;
            monitoringEnabled: boolean;
            managementType: string;
            organisation: {
                id: number;
                name: string;
            };
            systemimage: {
                id: number;
                name: string;
                externalId: string;
                templateId: number;
                osId: number;
                osName: string;
                osType: string;
                osVersion: string;
                osVersionId: number;
            };
            operatingsystemVersion: {
                id: number;
                osId: number;
                osName: string;
                osType: string;
                osVersion: string;
            };
            providerId: number;
            provider: string;
            providerApi: string;
            systemproviderConfiguration: {
                id: number;
                externalId: string;
                name: string;
                description: string;
            };
            region: string;
            zone: {
                id: number;
                name: string;
            };
            networks: ({
                id: number;
                mac: string;
                networkId: number;
                name: string;
                uid: string;
                netIpv4: string;
                netGatewayv4: string;
                netMaskv4: number;
                netIpv6: any;
                netGatewayv6: any;
                netMaskv6: number;
                netPublic: boolean;
                netCustomer: boolean;
                netInternal: boolean;
                vlan: number;
                ips: {
                    id: number;
                    publicIpv4: any;
                    ipv4: string;
                    publicIpv6: any;
                    ipv6: any;
                    hostname: string;
                }[];
                destinationv4: string[];
                destinationv6: string[];
                netslotNumber: number;
            } | {
                id: number;
                mac: string;
                networkId: number;
                name: string;
                uid: string;
                netIpv4: string;
                netGatewayv4: string;
                netMaskv4: number;
                netIpv6: string;
                netGatewayv6: string;
                netMaskv6: number;
                netPublic: boolean;
                netCustomer: boolean;
                netInternal: boolean;
                vlan: number;
                ips: {
                    id: number;
                    publicIpv4: string;
                    ipv4: any;
                    publicIpv6: any;
                    ipv6: any;
                    hostname: string;
                }[];
                destinationv4: any[];
                destinationv6: any[];
                netslotNumber: number;
            })[];
            publicNetworking: boolean;
            statsSummary: {
                diskspace: {
                    unit: string;
                    value: any;
                    max: any;
                    statusCategory: string;
                };
                memory: {
                    unit: string;
                    value: any;
                    max: any;
                    statusCategory: string;
                };
                cpu: {
                    unit: string;
                    value: any;
                    max: any;
                    statusCategory: string;
                };
            };
            dtExpires: number;
            billingStatus: string;
            externalInfo: any;
            parentsystem: {
                id: number;
                name: string;
            };
        } | {
            id: number;
            uid: string;
            hostname: string;
            fqdn: string;
            name: string;
            type: any;
            status: string;
            statusCategory: string;
            runningStatus: string;
            runningStatusCategory: string;
            cpu: number;
            memory: number;
            disk: string;
            monitoringEnabled: boolean;
            managementType: string;
            organisation: {
                id: number;
                name: string;
            };
            systemimage: any;
            operatingsystemVersion: {
                id: number;
                osId: number;
                osName: string;
                osType: string;
                osVersion: string;
            };
            providerId: any;
            provider: any;
            providerApi: any;
            systemproviderConfiguration: any;
            region: any;
            zone: any;
            networks: {
                id: number;
                mac: string;
                networkId: any;
                name: any;
                uid: any;
                netIpv4: any;
                netGatewayv4: any;
                netMaskv4: any;
                netIpv6: any;
                netGatewayv6: any;
                netMaskv6: any;
                netPublic: any;
                netCustomer: any;
                netInternal: any;
                vlan: any;
                ips: ({
                    id: number;
                    publicIpv4: string;
                    ipv4: string;
                    publicIpv6: any;
                    ipv6: any;
                    hostname: string;
                } | {
                    id: number;
                    publicIpv4: any;
                    ipv4: any;
                    publicIpv6: string;
                    ipv6: any;
                    hostname: string;
                })[];
                destinationv4: string[];
                destinationv6: string[];
                netslotNumber: number;
            }[];
            publicNetworking: boolean;
            statsSummary: {
                diskspace: {
                    unit: string;
                    value: any;
                    max: any;
                    statusCategory: string;
                };
                memory: {
                    unit: string;
                    value: any;
                    max: any;
                    statusCategory: string;
                };
                cpu: {
                    unit: string;
                    value: any;
                    max: any;
                    statusCategory: string;
                };
            };
            dtExpires: number;
            billingStatus: string;
            externalInfo: any;
            parentsystem: any;
        })[];
    };
    getUserInfo(user: UserEntity): {
        user: {
            id: number;
            username: string;
            email: string;
            firstName: string;
            lastName: string;
            roles: string[];
            status: string;
            language: string;
            organisation: {
                id: number;
                name: string;
                street: string;
                houseNumber: string;
                zip: string;
                city: string;
                reseller: any;
            };
            country: {
                id: string;
                name: string;
            };
            fullname: string;
            teams: {
                id: number;
                name: string;
                autoAddSshkey: boolean;
            }[];
            has2faEnabled: boolean;
        };
    };
}
