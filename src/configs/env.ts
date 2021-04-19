import path from 'path';
import resolve from 'resolve';
import Ajv, { AnySchemaObject } from 'ajv';
import { Logger } from '@nestjs/common';

// 动态加载环境配置
let configFile = 'config';
const env = process.env.NODE_ENV;
if (env) {
  configFile = `${configFile}.${env}`;
}

let configFilePath;
try {
  // 获取配置文件路径
  configFilePath = resolve.sync(configFile, {
    basedir: __dirname,
    extensions: ['.js', '.ts', '.json', '.txt'],
    moduleDirectory: ['configs'],
  });
} catch (err) {
  // 无配置文件或解析出错
  Logger.error(err);
  const errorMsg = 'Resolve Env Config Error';
  throw errorMsg;
}

let envConfig;
const fileInfo = path.parse(configFilePath);
const regExt = /\.((js)|(ts))$/;
if (fileInfo.ext.match(regExt)) {
  // js&ts配置文件require, 并仅支持默认和config导出
  envConfig = require(configFilePath); // eslint-disable-line
  envConfig = envConfig.config;
}

// 配置校验规则
const validateRules: AnySchemaObject = {
  required: ['dispatcher', 'acceptor', 'mysql', 'mongodb', 'web'],
  properties: {
    dispatcher: {
      type: 'object',
      required: ['port', 'address'],
      properties: {
        address: {
          type: 'string',
        },
        port: {
          type: 'number',
        },
      },
    },
    acceptor: {
      type: 'object',
      required: ['port', 'address'],
      properties: {
        port: {
          type: 'number',
        },
        address: {
          type: 'string',
        },
      },
    },
    mysql: {
      type: 'object',
      required: ['url'],
      properties: {
        type: 'string',
      },
    },
    mongodb: {
      type: 'object',
      required: ['url'],
      properties: {
        url: {
          type: 'string',
        },
        // adminUrl: {
        //   type: 'string',
        // },
        // isShared: {
        //   type: 'boolean',
        // },
        // limit: {
        //   type: 'number',
        // },
      },
    },
    web: {
      type: 'object',
      required: ['port'],
      properties: {
        port: {
          type: 'number',
        },
        // email: {
        //   type: 'object',
        //   required: ['from', 'smtp'],
        //   properties: {
        //     from: {
        //       type: 'string',
        //     },
        //     smtp: {
        //       type: 'string',
        //     },
        //   },
        // },
      },
    },
  },
};

const ajv = new Ajv({
  allErrors: true,
});
const validate = ajv.compile(validateRules);
const valid = validate(envConfig);

// 配置校验失败
if (!valid) {
  //   logger.error(generateErrorsMsg(validate.errors));
  const errorMsg = 'Environment configuration checkout failed';
  throw errorMsg;
}

// envConfig.database.entities = entities;

export const config = envConfig;
