import { withRouter } from 'next/router'
import { useEffect } from 'react'
import ContentWrap from '../components/ContentWrap'

// '/' path to '/products'
export default withRouter(
  function Home(props: any) {
    useEffect(() => {
      props.router.push('/products')
    }, [props.router])
    return (
      <ContentWrap>
        <div>
          Loading...
        </div>
      </ContentWrap>
    )
  }
)