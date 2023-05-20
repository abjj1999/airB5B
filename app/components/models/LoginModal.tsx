'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {signIn} from "next-auth/react";
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import  Input  from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
    const loginModal = useLoginModal();
    const RegisterModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const { 
        register, 
        handleSubmit,
        formState: {
          errors,
        },
      } = useForm<FieldValues>({
        defaultValues: {
        
          email: '',
          password: ''
        },
      });

    const onSubmit: SubmitHandler<FieldValues> =  (data) => {
        console.log("data")
        setIsLoading(true);
        signIn("credentials", {
          ...data,
          redirect: false,
        })
        .then((callback) => {
          setIsLoading(false);
          if (callback?.ok) {
            
            toast.success("Logged in successfully");
            router.refresh()
            loginModal.onClose();
          } 

          if (callback?.error) {
            toast.error(callback.error);
          }
        })
    };

    const toggleModal = useCallback(() => {
        loginModal.onClose();
        RegisterModal.onOpen();
    }, [loginModal, RegisterModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome Back" subTitle="Login through your account" />
            <Input 
                id="email"
                label="Email"
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
            onClick={() => signIn("github")}
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
            <p>First time using Air?{" "}
              <span 
                onClick={toggleModal}
                className="
                  text-neutral-800
                  cursor-pointer 
                  hover:underline
                "
                >Create an account</span>
            </p>
          </div>
        </div>
      )

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login" 
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
     );
}
 
export default LoginModal;