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

class MediaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('media', ChoiceType::class, [
                'choices' => [
                    'Instagram' => 'Instagram',
                    'Tiktok' => 'Tiktok',
                    'Youtube' => 'Youtube',
                ],
                'placeholder' => 'Which media ?',
                'required' => true,
            ])
            ->add('services', ChoiceType::class, [
                'choices' => [
                    'Likes' => 'Likes',
                    'Followers' => 'Followers',
                ],
                'placeholder' => 'Which services ?',
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

        $builder->addEventListener(FormEvents::PRE_SUBMIT, function (FormEvent $event) {
            $form = $event->getForm();
            $data = $event->getData();

            if ($data['media'] === 'Youtube') {
                // Si "media" est égal à "Youtube", ajoutez "Dislike" aux choix de "services"
                $form->add('services', ChoiceType::class, [
                    'choices' => [
                        'Likes' => 'Likes',
                        'Followers' => 'Followers',
                        'Dislike' => 'Dislike',
                    ],
                    'placeholder' => 'Which services ?',
                    'required' => true,
                ]);
            } else {
                // Si "media" est différent de "Youtube", retirez "Dislike" des choix de "services"
                $form->add('services', ChoiceType::class, [
                    'choices' => [
                        'Likes' => 'Likes',
                        'Followers' => 'Followers',
                    ],
                    'placeholder' => 'Which services ?',
                    'required' => true,
                ]);
            }
        });
    }
}
