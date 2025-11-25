import MissingClientPage from './clientPage';

{
    /* <Link href="/missing/detail/1"> 디테일 이동</Link> */
}

export default async function MissingPage() {
    const data = {
        count: 47,
        items: [],
    };

    return <MissingClientPage data={data} />;
}
