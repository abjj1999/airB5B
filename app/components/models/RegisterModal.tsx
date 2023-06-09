'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import  Input  from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import LoginModal from "./LoginModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
    const RegisterModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
          name: '',
          email: '',
          password: ''
        },
      });

    const onSubmit: SubmitHandler<FieldValues> =  (data) => {
        console.log("data")
        setIsLoading(true);
        axios.post("/api/register", data)
            .then(() => {
                RegisterModal.onClose();
                loginModal.onOpen();
            })
            .catch((err) => {
                // console.log("Something went wrong")
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Air" subTitle="Create an account" />
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input 
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )
    const toggleModal = useCallback(() => {
      RegisterModal.onClose();
      loginModal.onOpen();
  }, [RegisterModal, loginModal])

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button
            outline 
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn("google")}
             
          />
          <Button 
            outline 
            onClick={() => signIn('github')}
            label="Continue with Github"
            icon={AiFillGithub}
            
          />
          <div 
            className="
              text-neutral-500 
              text-center 
              mt-4 
              font-light
            "
          >
            <p>Already have an account?{" "}
              <span 
                onClick={toggleModal}
                className="
                  text-neutral-800
                  cursor-pointer 
                  hover:underline
                "
                >Log in</span>
            </p>
          </div>
        </div>
      )

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={RegisterModal.isOpen}
            title="Sign up" 
            actionLabel="Continue"
            onClose={RegisterModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default RegisterModal;