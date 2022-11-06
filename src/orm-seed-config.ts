import ormconfig from './ormconfig'

const ormSeedConfig = {
    ...ormconfig,
    migrations: [__dirname + '/seeds/**/*.ts']
}

export default ormSeedConfig
