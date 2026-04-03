export default function ColumnHeader(props) {
    return (
        <dl className='flex justify-between items-center w-full'>
            <dt className='font-bold tracking-widest text-slate-400'>{props.title}</dt>
            <dd className='bg-slate-300 px-3 py-2 font-bold text-slate-600 rounded-xl text-sm'>{props.amount}</dd>
        </dl>
    )
}