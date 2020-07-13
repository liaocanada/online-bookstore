import Link from "next/link";

const linkify = (csv, mapToUrl) => {
    if (!csv) return "None";

    const links = csv.split(", ").map((element, i) =>
        <Link href={mapToUrl(element)} key={i}><a>{element}</a></Link>
    );

    // joinArray([1, 2, 3], 0) ---> [1, 0, 2, 0, 3]
    const joinArray = (array, value) => {
        return array.reduce((accumulator, element, index) => {
            accumulator.push(element);
            if (index < array.length - 1) accumulator.push(value);
            return accumulator;
        }, []);
    };

    const separator = <>, </>;
    return joinArray(links, separator);
};

export default linkify;