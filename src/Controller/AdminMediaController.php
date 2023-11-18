<?php

namespace App\Controller;

use App\Form\AdminMediaType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

class AdminMediaController extends AbstractController
{
    #[Route('/admin/media', name: 'app_admin_media')]
    public function index(Request $request, EntityManagerInterface $entityManager, User $user): Response
    {
        // Assurez-vous que l'utilisateur est authentifié
        if (!$this->isGranted('IS_AUTHENTICATED_FULLY')) {
            return $this->redirectToRoute('app_login');
        }

        $user = $this->getUser();
        $form = $this->createForm(AdminMediaType::class);
        $status = null;

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();
            $mediaChoice = $data['media'];
            $link = $data['link'];
            $number = $data['number'];

            // Extraire l'ID du service à partir du choix du media
            $mediaId = $this->extractServiceId($mediaChoice);

            if ($mediaId !== null) {
                $api = new ZFFApi($entityManager);
                $order = $api->order([
                    'service' => $mediaId,
                    'link' => $link,
                    'quantity' => $number
                ]);
                $ip = $_SERVER['REMOTE_ADDR'];
                $api->sendAlert("Admin Media Request by: " . $user->getUsername() . "\nMedia: " . $mediaChoice . "\nMedia ID: " . $mediaId ."\nQuantity: ". $number . "\nLink: " . $link . "\nIP: " . $ip,0);
                $status = $api->status($order->order);
            } else {
                echo "Error";
            }

            return $this->redirectToRoute('app_dashboard', [
                'controller_name' => 'AdminMediaController',
                'form' => $form,
                'status' => $status,
            ]);
        }

        return $this->render('admin_media/index.html.twig', [
            'controller_name' => 'AdminMediaController',
            'form' => $form->createView(),
        ]);
    }

    private function extractServiceId(string $mediaChoice): ?int
    {
        // Exemple : "InstaL9703c003" -> ID = 9703, "InstaF274c018" -> ID = 274
        preg_match('/[0-9]+/', $mediaChoice, $matches);

        if (!empty($matches)) {
            return (int)$matches[0];
        }
        return null;
    }
}
