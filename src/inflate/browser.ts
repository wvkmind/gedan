import { Buffer } from 'buffer/'

import { inflate } from 'pako'

const inflateAsync = (d: Buffer) => Buffer.from(inflate(d))

export const inflates = { inflateAsync, Buffer }
