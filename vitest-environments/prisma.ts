import 'dotenv'
import { randomUUID } from "crypto";
import { execSync } from 'child_process';
import { Environment } from "vitest";
import { prisma } from '../src/lib/prisma';


function generateDataBaseURL(schema:string){

  const envDatabaseURL = process.env.DATABASE_URL
  if(!envDatabaseURL){
    throw new Error("Fill environment variable DATABASE_URL")
  }

  const url = new URL(envDatabaseURL)

  url.searchParams.set('schema', schema)

  return url.toString()
}


export default<Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup(global, options) {

    const schema = randomUUID()

    const databaseURL = generateDataBaseURL(schema)
    
    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return{
      async teardown(){
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema} CASCADE"`)

        await prisma.$disconnect()
      }
    }
  },
}