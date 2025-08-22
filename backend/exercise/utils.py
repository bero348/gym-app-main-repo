
def exercisesFlattener(exercises_obj_from_api):
   
    flattened_obj = {}

    for key, val in exercises_obj_from_api.items():
        
        if not ("variants" in val and val["variants"]):
            flattened_obj[key] = val
        else:
            
            for variant_key, variant_description in val["variants"].items():
                
                variant_name = f"{variant_key}_{key}"

                
               
                original_substitutes = val.get("substitutes", [])
                
               
                variant_substitutes = [
                    f"{v_k} {key.replace('_', ' ')}" # "Wide Pushups"
                    for v_k in val["variants"].keys()
                    if f"{v_k}_{key}" != variant_name
                ]
                
                
                all_substitutes = list(set(original_substitutes + variant_substitutes))
                
                flattened_obj[variant_name] = {
                    **val,  
                    "name": variant_name, 
                    "description": f"{val['description']}___{variant_description}", 
                    "substitutes": all_substitutes[:5], 
                    "variants": {}, 
                }
    return flattened_obj