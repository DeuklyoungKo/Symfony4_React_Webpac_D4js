<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    /**
     * @Route("/main", name="main")
     * @Route("/{pageCode}", name="pageCode")
     */
    public function main(string $pageCode = 'Dashboard')
    {
        return $this->render('main/index.html.twig', [
            'controller_name' => 'MainController',
            'pageCode' => $pageCode
        ]);
    }
}
