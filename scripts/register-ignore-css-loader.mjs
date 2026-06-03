import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register(new URL('./ignore-css-loader.mjs', import.meta.url), pathToFileURL('./'));
