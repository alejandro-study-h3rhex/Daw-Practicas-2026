# Informe de Ejecución 1 (Sin ajustar pront planner):

## LangGraph Registro de Nodos
- **NODO: PLANNER**: El planificador ha decidido que no se necesita investigación.
- **NODO: DRAFTER**: (Ejecución de borrador completada).
- **NODO: REVIEWER**: El revisor ha aprobado la respuesta.

## Contenido Generado (Versión Final)

```
LangGraph es una herramienta innovadora diseñada para facilitar la interacción y el análisis de datos en el ámbito del procesamiento del lenguaje natural (NLP, por sus siglas en inglés). 

Su principal función es permitir a los usuarios trabajar con gráficas de lenguaje de manera eficiente, lo que implica la representación de datos textuales en forma de nodos y relaciones que facilitan el análisis contexto-dependiente.Aplicaciones destacadas de LangGraph:

Análisis Semántico: Permite entender las relaciones entre diferentes conceptos y palabras dentro de un texto, ayudando a revelar patrones y significados ocultos.

Extracción de Conocimiento: Ayuda a identificar y extraer información clave de grandes volúmenes de texto para facilitar su comprensión.

Mejora de Sistemas de Recomendación: Utiliza el análisis de relaciones entre términos para desarrollar recomendaciones personalizadas.

Visualización de Datos Textuales: Facilita la comprensión de la estructura de los datos mediante representaciones gráficas.
Resumen: Es una herramienta versátil que potencia el análisis de datos textuales para aplicaciones en IA y procesamiento de lenguaje natural.Estructura del Grafo
```

##  Estructura del Grafo (Runtime)
```
------------------------------------------------------------------------

                      +-----------+                   
                      | __start__ |                   
                      +-----------+                   
                             *                        
                             *                        
                             *                        
                        +---------+                   
                        | planner |                   
                        +---------+....               
                      ...              ....           
                     .                     ....       
                   ..                          ....   
            +---------+                            .. 
            | drafter |                             . 
            +---------+                             . 
           ***        ***                           . 
          *              *                          . 
        **                ***                       . 
+----------+                 **                     . 
| reviewer |...                *                  ..  
+----------+   ......           ***             ..    
      .              ......        *          ..      
      .                    ......   ***     ..        
      .                          ...   *   .          
+---------+                       +------------+      
| __end__ |                       | researcher |      
+---------+                       +------------+   
------------------------------------------------------------------------

```   

# Informe de Ejecución 2 (Pront planner ajustado):

## LangGraph Registro de Nodos
- NODO: PLANNER: El planificador ha detectado la necesidad de datos actualizados y ha activado la investigación: YES.
- NODO: RESEARCHER: Se ha ejecutado una búsqueda externa con éxito para el término: ¿Qué es LangGraph y para qué sirve?
- NODO: DRAFTER: Generación del contenido basada en la información recuperada de internet.
- NODO: REVIEWER: El revisor ha verificado la precisión técnica y ha aprobado la respuesta final.

## Contenido Generado (Versión Final)
LangGraph es un marco de trabajo desarrollado por LangChain diseñado para gestionar el flujo de control en aplicaciones que integran modelos de lenguaje (LLMs). Este framework permite a los desarrolladores orquestar de manera controlada una serie de pasos o tareas, tomando decisiones en puntos específicos del proceso.

En términos prácticos, LangGraph es especialmente útil cuando se necesita un control preciso sobre la ejecución de agentes. Ofrece herramientas y abstracciones que facilitan la construcción de aplicaciones que requieren seguir un proceso predecible. Utiliza una estructura de grafo dirigido para definir el flujo de la aplicación, lo que permite una mayor organización y claridad.

Es considerado uno de los marcos más avanzados y listos para producción para el desarrollo de agentes de IA.

Fuentes consultadas: <a href="https://huggingface.co/learn/agents-course/es/unit2/langgraph/when_to_use_langgraph">Hugging Face</a> | <a href="https://www.datacamp.com/es/tutorial/langgraph-tutorial">DataCamp</a>


## Estructura del Grafo (Runtime)
```
-------------------------------------------------------------------------
                      +-----------+                   
                      | __start__ |                   
                      +-----------+                   
                             *                        
                             *                        
                             *                        
                        +---------+                   
                        | planner |                   
                        +---------+....               
                      ...              ....           
                     .                     ....       
                   ..                          ....   
            +---------+                            .. 
            | drafter |                             . 
            +---------+                             . 
           ***        ***                           . 
          *              *                          . 
        **                ***                       . 
+----------+                 **                     . 
| reviewer |...                *                  ..  
+----------+   ......           ***             ..    
      .              ......        *          ..      
      .                    ......   ***     ..        
      .                          ...   *   .          
+---------+                       +------------+      
| __end__ |                       | researcher |      
+---------+                       +------------+      
------------------------------------------------------------------------
```
