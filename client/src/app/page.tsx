'use client';

export default function Home() {
  // const { status } = useSession();
    
  // if (status === "loading") return <Loading />;
  // else if (status === "unauthenticated") redirect('signin');
  //  redirect('dashboard');


const me = () => {
  const res = fetch('http://huddlehub.io/api/client/me')
}


  return (<div onClick={me}>dfsdfsdf</div>)
}
