import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type  AlertType ={
    btnName: string,
    title: string,
    firstTime: string,
    secondTime: string,
    classcode: string
}

const AlertDialogDemo = ({btnName,title, firstTime, secondTime, classcode}: AlertType) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline'>{btnName}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='font-bold'>{title}</AlertDialogTitle>
          <AlertDialogDescription className='pl-3'>
            Start at: {firstTime}
          </AlertDialogDescription>
          <AlertDialogDescription className='pl-3'>
            End at: {secondTime}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            
            <Link href={`/class/${classcode}/attendance_taking`}>
                Start
            </Link>
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDialogDemo;
