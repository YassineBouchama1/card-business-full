'use client'
import { useRef, type FC } from 'react';
import UploaderImg from './UploaderImg';
import { FormField } from './FormField';
import { SubmitButton } from './SubmitButton';
import toast from 'react-hot-toast';
import { createCard } from '@/actions/createCard';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { updateCard } from '@/actions/updateCard';

interface FormCustomProps { }

const FormCustom: FC<FormCustomProps> = ({ }) => {

  const router = useRouter();

  const searchParams = useSearchParams()

  //get querys
  const name = searchParams.get('name')
  const company = searchParams.get('company')
  const title = searchParams.get('title')
  const contact = searchParams.get('contact')
  const id = searchParams.get("id");

  // ref
  const fromRef = useRef<HTMLFormElement>(null)

  //createing card useing server action
  async function createAction(format: FormData) {

    const result = await createCard(format)

    // handle erros from api
    if (result?.error) {
      toast.error(result?.error)
    }

    //handle zod errors
    else if (result?.errorZod) {
      Object.keys(result.errorZod).forEach((key: string) => {
        toast.error(`${key} ${result.errorZod[key]}`);
      });
    }
    else {
      toast.success('Added New Card Successfully ')
      fromRef.current?.reset()
    }
  }


  // updateing card
  async function updateAction(format: FormData) {

    const result = await updateCard(format)

    // handle erros from api
    if (result?.error) {
      toast.error(result?.error)
    } else {
      toast.success('Updated Successfully ')
      fromRef.current?.reset()
      router.push('?');
    }
  }


  return (
    <form
      action={name ? updateAction : createAction}
      ref={fromRef}
      className="flex w-auto  flex-col items-start  gap-2   "
    >
      <div className="flex flex-col md:flex-row gap-3">
        <FormField
          id="name"
          name="name"
          type="text"
          placeholder="name"
          title="name"
          defaultValue={name && name}
        />
        <FormField
          id="company"
          name="company"
          type="text"
          placeholder="company"
          title="company"
          defaultValue={company && company}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <FormField
          id="contact"
          name="contact"
          type="text"
          placeholder="contact"
          title="contact"
          defaultValue={contact && contact}
        />
        <FormField
          id="title"
          name="title"
          type="text"
          placeholder="title"
          title="title"
          defaultValue={title && title}
        />
        {id && <input hidden value={id} name="id"></input>}

      </div>
      <div className="w-full my-6 flex justify-center">
        <SubmitButton
          title={name ? "update" : "create"}
          style='bg-theme-color w-52 px-2 py-3 rounded-md text-white text-end"'
        />
      </div>
    </form>
  );
}
export default FormCustom;