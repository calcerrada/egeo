/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */
export const JSON_SCHEMA: any = {
   'type': 'object',
   'title': '',
   'description': '',
   'ui': {
      'component': 'standard'
   },
   'properties': {
      'general': {
         'type': 'object',
         'title': 'General',
         'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
         'ui': {
            'component': 'show-more'
         },
         'properties': {
            'serviceConfiguration': {
               'title': 'Type of Sparta',
               'type': 'string',
               'enum': ['a', '/sparta/sparta-server/null', 'c'],
               'examples': ['/sparta/sparta-server/null'],
               'default': '/sparta/sparta-server/null',
               'ui': { 'relatedTo': 'serviceId' }
            },
            'serviceId': {
               'title': 'Name',
               'type': 'string',
               'default': ''
            },

            'a': {
               'title': 'a',
               'type': 'string',
               'ui': { 'relatedTo': 'b'}
            },
            'b': {
               'title': 'b',
               'type': 'string',
               'enum': ['a', '/sparta/sparta-server/null', 'c'],
               'default': '/sparta/sparta-server/null'
            },
            'c': {
               'title': 'c',
               'type': 'string',
               'default': '',
               'ui': {
                  'relatedTo': 'd'
               }
            },
            'd': {
               'title': 'd',
               'type': 'string',
               'enum': ['a', '/sparta/sparta-server/null', 'c'],
               'default': '/sparta/sparta-server/null',
               'ui': { 'relatedTo': 'e' }
            },
            'e': {
               'title': 'e',
               'type': 'string',
               'enum': ['a', '/sparta/sparta-server/null', 'c'],
               'default': '/sparta/sparta-server/null'
            },
            'runMode': {
               'title': 'Run mode',
               'required': false,
               'readOnly': false,
               'type': 'string',
               'default': 'production',
               'level': 1,
               'minLength': 3,
               'maxLength': 100,
               'exclusiveMinimum': false,
               'exclusiveMaximum': false,
               'internalName': 'RUN_MODE'
            },
            'resources': {
               'type': 'object',
               'title': 'Scheduler resources',
               'description': '',
               'ui': {
                  'component': 'accordion'
               },
               'properties': {
                  'Sparta_Docker_Image': {
                     'title': 'Docker image',
                     'required': false,
                     'readOnly': true,
                     'type': 'string',
                     'default': 'qa.stratio.com/stratio/sparta:2.0.0-RC3',
                     'level': 1,
                     'minLength': 3,
                     'maxLength': 100,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'SPARTA_DOCKER_IMAGE'
                  },
                  'Sparta_Marathon_Force_Pull_Image': {
                     'title': 'Is downloaded scheduler image each time?',
                     'required': false,
                     'readOnly': true,
                     'type': 'boolean',
                     'default': true,
                     'level': 1,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'SPARTA_MARATHON_FORCE_PULL_IMAGE'
                  },
                  'mem': {
                     'title': 'Memory',
                     'required': true,
                     'readOnly': true,
                     'type': 'integer',
                     'default': 1024,
                     'level': 1,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'MEM'
                  },
                  'instances': {
                     'title': 'Instances',
                     'required': true,
                     'readOnly': false,
                     'type': 'integer',
                     'default': 0,
                     'level': 1,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'INSTANCES'
                  },
                  'cpus': {
                     'title': 'CPU',
                     'required': true,
                     'readOnly': true,
                     'type': 'integer',
                     'default': 1,
                     'level': 1,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'CPUs'
                  }
               },
               'required': ['mem', 'instances', 'cpus']
            },
            'zookeeper': {
               'type': 'object',
               'title': 'Zookeeper',
               'description': '',
               'ui': {
                  'component': 'accordion'
               },
               'properties': {
                  'Sparta_Zookeeper_Connection_String': {
                     'title': 'Zookeeper connection String',
                     'required': false,
                     'readOnly': true,
                     'type': 'string',
                     'default': 'zk-0001.zkuserland.mesos:2181,zk-0002.zkuserland.mesos:2181,zk-0003.zkuserland.mesos:2181',
                     'level': 1,
                     'minLength': 3,
                     'maxLength': 256,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'SPARTA_ZOOKEEPER_CONNECTION_STRING'
                  },
                  'SpartaPluginZkConnect': {
                     'title': 'Plugin Zookeeper connection',
                     'required': false,
                     'readOnly': true,
                     'type': 'string',
                     'default': 'gosec1.node.paas.labs.stratio.com:2181,gosec2.node.paas.labs.stratio.com:2181,gosec3.node.paas.labs.stratio.com:2181',
                     'level': 1,
                     'minLength': 3,
                     'maxLength': 256,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'SPARTA_PLUGIN_ZK_CONNECT'
                  },
                  'Sparta_Zookeeper_Path': {
                     'title': 'Path',
                     'readOnly': true,
                     'type': 'string',
                     'default': '/stratio/sparta',
                     'level': 1,
                     'minLength': 3,
                     'maxLength': 100,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'SPARTA_ZOOKEEPER_PATH'
                  },
                  'Sparta_Plugin_Zookeeper_Watchers': {
                     'title': 'Watchers',
                     'required': false,
                     'readOnly': false,
                     'type': 'boolean',
                     'default': true,
                     'level': 1,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'SPARTA_PLUGIN_ZOOKEEPER_WATCHERS'
                  },
                  'Sparta_Zookeeper_Retry_Interval': {
                     'title': 'Retry interval',
                     'required': false,
                     'readOnly': false,
                     'type': 'integer',
                     'default': 10000,
                     'level': 1,
                     'minimum': 1,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'SPARTA_ZOOKEEPER_RETRY_INTERVAL'
                  },
                  'Sparta_Zookeeper_Retry_Atempts': {
                     'title': 'Retry atempts',
                     'required': false,
                     'readOnly': false,
                     'type': 'integer',
                     'default': 5,
                     'level': 1,
                     'minimum': 1,
                     'maximum': 100,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'SPARTA_ZOOKEEPER_RETRY_ATEMPTS'
                  },
                  'Sparta_Zookeeper_Connection_Timeout': {
                     'title': 'Connection TimeOut',
                     'required': false,
                     'readOnly': false,
                     'type': 'integer',
                     'default': 15000,
                     'level': 1,
                     'minimum': 1,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'SPARTA_ZOOKEEPER_CONNECTION_TIMEOUT'
                  },
                  'Sparta_Zookeeper_Session_Timeout': {
                     'title': 'Session TimeOut',
                     'required': false,
                     'readOnly': false,
                     'type': 'integer',
                     'default': 60000,
                     'level': 1,
                     'minimum': 1,
                     'exclusiveMinimum': false,
                     'exclusiveMaximum': false,
                     'internalName': 'SPARTA_ZOOKEEPER_SESSION_TIMEOUT'
                  }
               }
            }
         },
         'required': ['serviceId']
      }
   }
};
