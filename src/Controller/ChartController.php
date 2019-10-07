<?php

namespace App\Controller;

use App\Entity\Chart;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ChartController extends AbstractController
{

    /**
     * @Route("/chart/data/", name="chart_datas" , methods={"GET","POST"})
     */
    public function chartDatas(NormalizerInterface $normalizer, Request $request)
    {

        $content = json_decode($request->getContent());
        $pageSize = $content->pageSize;
        $page = $content->page ?:1;


        $firstResult = ($page-1)*$pageSize;

        $chartsCount = $this->getDoctrine()
            ->getRepository(Chart::class)
            ->chartListTotalCount();


        $charts = $this->getDoctrine()
                      ->getRepository(Chart::class)
                      ->chartList($pageSize, $firstResult);

        $pages = ceil($chartsCount / $pageSize);

/*
//        $arrayContents = $normalizer->normalize($charts);
//        var_dump($arrayContents);

        $jsonContentsToArray = array_map(function ($v){
            return array_values($v);
        },$arrayContents);
//        dd($results);*/


//        var_dump($charts);

        $response = new JsonResponse([
            'pages' => $pages,
            'rows' => $charts
                                     ]);

        return $response;

//        return new Response('Check out this great product: '.$chart->getTitle());
    }




    /**
     * @Route("/chart/data/{id}", name="chart_data", requirements={"id"="\d+"})
     */
    public function chartData($id, NormalizerInterface $normalizer)
    {

        $chart = $this->getDoctrine()
                      ->getRepository(Chart::class)
                      ->find($id);

        if (!$chart) {
            throw $this->createNotFoundException(
                'No chart Found for id '.$id
            );
        }

        $jsonContent = $normalizer->normalize($chart);
        $jsonContent = array_values($jsonContent);

//        dd($arrayData);

        $response = new JsonResponse(['data' => $jsonContent]);

        return $response;
    }


    /**
     * @Route("/chart/data/create", name="create_chart")
     */
    public function createChart(ValidatorInterface $validator): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $chart = new Chart();
        $chart->setTitle('data of sample');
//        $chart->setTitle(null);
        $chart->setStartYear(1975);
        $chart->setEndYear(1978);
        $chart->setDataFile("/upload/data/data_basic1.csv");

        $errors = $validator->validate($chart);

        if (count($errors) > 0) {
            return new Response((string) $errors, 400);
        }


        $entityManager->persist($chart);
        $entityManager->flush();
        return new Response('Saved new procudt with id '.$chart->getId());
    }

}
