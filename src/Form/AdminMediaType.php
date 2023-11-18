<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class AdminMediaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('media', ChoiceType::class, [
                'choices' => [
                    'InstaL9703c003' => 'InstaL9703c003',
                    'InstaL7763c0023' => 'InstaL7763c0023',
                    'InstaL3441c0062' => 'InstaL3441c0062',
                    'InstaL8685c0049' => 'InstaL8685c0049',
                    'InstaF3356c012' => 'InstaF3356c012',
                    'InstaF274c018' => 'InstaF274c018',
                    'YoutubeL9935c014' => 'YoutubeL9935c014',
                    'YoutubeL9936c015' => 'YoutubeL9936c015',
                    'YoutubeF9914c033' => 'YoutubeF9914c033',
                    'TiktokV1738c0001' => 'Tiktokv1738c0001',
                    'TwitchF7764c122' => 'TwitchF7764c122',
                    'LinkedInV3743c480' => 'LinkedInV3743c480',
                    'SoundcloudV594c002' => 'SoundcloudV594c002',
                ],
                'placeholder' => 'Which media ?',
                'required' => true,
            ])
            ->add('link', TextType::class, [
                'required' => true,
                'label' => 'Lien',
            ])
            ->add('number', TextType::class, [
                'required' => true,
                'label' => 'Quantité',
            ])
            ->add('save', SubmitType::class, [
                'attr' => ['class' => 'save'],
                'label' => 'Send',
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
