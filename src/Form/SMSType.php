<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SMSType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('from', TextType::class, [
                'attr' => [
                    'placeholder' => 'From',
                    'value' => '+18155970282',
                ],
                'label' => false,

            ])
            ->add('to', TextType::class, [
                'attr' => [
                    'placeholder' => 'Send To',
                ],
                'label' => false,

            ])
            ->add('message', TextType::class, [
                'attr' => [
                    'placeholder' => 'Message',
                ],
                'label' => false,
            ])
            // Add the captcha field here if needed
            ->add('submit', SubmitType::class, [
                'label' => 'Send',
                'attr' => ['class' => 'btn'],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
