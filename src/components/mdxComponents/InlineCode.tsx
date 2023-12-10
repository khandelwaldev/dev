import { twclsx } from '@/libs/twclsx'

interface InlineCodeProps {
  children: React.ReactNode
}

const InlineCode: React.FunctionComponent<InlineCodeProps> = ({ children }) => {
  return (
    <code className={twclsx('')}>
      {children}
    </code>
  )
}

export default InlineCode