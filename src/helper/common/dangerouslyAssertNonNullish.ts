/**
 * @example: function example(param?: string) {
 * 	try {
 * 		const newString1 = param.toUpperCase() // ERROR ==> Object is possibly 'undefined'
 *
 * 		dangerouslyAssertNonNullish(param, 'param is undefined');
 *
 * 		const newString2 = param.toUpperCase(); // all fine
 * 	} catch (e) {
 * 		 <error handle>
 * 	}
 * }
 */
export default function dangerouslyAssertNonNullish<T>(
    value: T,
    message: string,
): asserts value is NonNullable<T> {
    if (value === null || value === undefined) {
        throw Error(message);
    }
}
