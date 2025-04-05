'use client';
import { Error } from '@/components/Error'
import { FileQuestion } from "lucide-react"

const NotFound = () => {
  return <Error 
          Icon={FileQuestion} 
          description="Sorry, we couldn't find the page you're looking for." 
          showRetryButton={false}
          title='Page not found' />
}

export default NotFound;